'use client';
import React from 'react';
import Image from 'next/image';
import styles from './LevelsOfParticipation.module.css';
import delegates1 from '@/app/public/img/delegates-1.jpg';
import delegates2 from '@/app/public/img/delegates-2.jpg';
import delegates3 from '@/app/public/img/delegates-3.jpg';

const levels = [
  {
    title: "Junior Delegates",
    age: "11-14 Years Old",
    description: "Specially designed for younger participants with lighter topics and supportive simulations. Requires at least intermediate English to join comfortably.",
    img: delegates1,
  },
  {
    title: "Delegates",
    age: "15-25 Years Old",
    description: "Ideal for first-timers or those with some MUN experience who want to grow in a dynamic setting. Intermediate English needed to join with ease.",
    img: delegates2,
  },
  {
    title: "Advanced Delegates",
    age: "15-25 Years Old",
    description: "For experienced MUNers ready for deeper discussions, complex topics, and a faster pace. Recommended for those who have joined at least 1 previous MUN conference. Good command of English needed for in-depth debates.",
    img: delegates3,
  }
];

export default function LevelsOfParticipation() {
  return (
    <section className={styles.section} id="levels-of-participation">
      <div className={styles.container}>
        <div className={styles.header} data-aos="fade-up">
          <h2 className={styles.heading}>
            Levels of Participation
          </h2>
          <div className={styles.headingUnderline}></div>
        </div>

        <div className={styles.grid}>
          {levels.map((level, index) => (
            <div
              key={index}
              className={styles.card}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={level.img}
                  alt={level.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className={styles.titleBanner}>
                  <h3 className={styles.titleText}>{level.title}</h3>
                </div>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.age}>{level.age}</p>
                <p className={styles.description}>{level.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
