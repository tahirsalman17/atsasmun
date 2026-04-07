// GitHub-based Database Utility
// Uses GitHub API to store JSON data as files in a repository

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_DB_REPO; // format: "owner/repo"
const GITHUB_BRANCH = process.env.GITHUB_DB_BRANCH || "main";

const BASE_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents`;

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
  "Content-Type": "application/json",
};

// Get file content from GitHub
async function getFile(path) {
  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    console.error("GITHUB_TOKEN or GITHUB_DB_REPO is missing!");
    return { data: [], sha: null };
  }

  const url = `${BASE_URL}/${path}?ref=${GITHUB_BRANCH}`;
  console.log(`Reading from GitHub: ${url}`);

  try {
    const response = await fetch(url, {
      headers,
      cache: "no-store",
    });

    console.log(`GitHub Read Response Status: ${response.status}`);

    if (response.status === 404) {
      console.log(`File not found, returning empty array: ${path}`);
      return { data: [], sha: null };
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GitHub Read Error Text: ${errorText}`);
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const file = await response.json();
    const content = Buffer.from(file.content, "base64").toString("utf-8");
    return { data: JSON.parse(content), sha: file.sha };
  } catch (error) {
    console.error("Error reading from GitHub:", error);
    return { data: [], sha: null };
  }
}

// Save file content to GitHub
async function saveFile(path, data, sha, message = "Update data") {
  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    console.error("GITHUB_TOKEN or GITHUB_DB_REPO is missing during save!");
    throw new Error("Missing GitHub credentials");
  }

  const url = `${BASE_URL}/${path}`;
  console.log(`Saving to GitHub: ${url} (sha: ${sha || "new file"})`);

  try {
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString(
      "base64"
    );

    const body = {
      message,
      content,
      branch: GITHUB_BRANCH,
    };

    if (sha) {
      body.sha = sha;
    }

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    console.log(`GitHub Save Response Status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`GitHub Save Error:`, errorData);
      throw new Error(
        `GitHub API error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const result = await response.json();
    return { success: true, sha: result.content.sha };
  } catch (error) {
    console.error("Error saving to GitHub:", error);
    throw error;
  }
}

// Database operations for a specific collection
export class GitHubDB {
  constructor(collectionName) {
    this.path = `data/${collectionName}.json`;
  }

  // Get all records
  async getAll() {
    const { data } = await getFile(this.path);
    return data;
  }

  // Get a single record by ID
  async getById(id) {
    const { data } = await getFile(this.path);
    return data.find((item) => item.id === id) || null;
  }

  // Create a new record
  async create(record) {
    const { data, sha } = await getFile(this.path);
    const newRecord = {
      ...record,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.push(newRecord);
    await saveFile(this.path, data, sha, `Add new ${this.path}`);
    return newRecord;
  }

  // Update a record
  async update(id, updates) {
    const { data, sha } = await getFile(this.path);
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Record not found");

    data[index] = {
      ...data[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await saveFile(this.path, data, sha, `Update ${this.path} id:${id}`);
    return data[index];
  }

  // Delete a record
  async delete(id) {
    const { data, sha } = await getFile(this.path);
    const filtered = data.filter((item) => item.id !== id);
    if (filtered.length === data.length) throw new Error("Record not found");

    await saveFile(this.path, filtered, sha, `Delete from ${this.path} id:${id}`);
    return { success: true };
  }

  // Get records with pagination
  async getPaginated(page = 1, pageSize = 10, searchQuery = "") {
    const { data } = await getFile(this.path);

    let filtered = data;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = data.filter((item) =>
        Object.values(item).some(
          (val) =>
            typeof val === "string" && val.toLowerCase().includes(query)
        )
      );
    }

    // Sort by newest first
    filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const paginatedData = filtered.slice(start, start + pageSize);

    return {
      data: paginatedData,
      pagination: {
        page,
        pageSize,
        pageCount: totalPages,
        total,
      },
    };
  }
}

// Pre-defined collections
export const collections = {
  istanbul: new GitHubDB("registrations-istanbul"),
  dubai: new GitHubDB("registrations-dubai"),
  azerbaijan: new GitHubDB("registrations-azerbaijan"),
  usa: new GitHubDB("registrations-usa"),
  saudi: new GitHubDB("registrations-saudi"),
  uk: new GitHubDB("registrations-uk"),
  blogs: new GitHubDB("blogs"),
  notifications: new GitHubDB("notifications"),
  authors: new GitHubDB("authors"),
};
