import React from 'react';
import styles from "../css/dog-collage.module.css";


function DogCollage(){
    return (
      <div className="container-fluid">
        <div className={styles.gallery}>
          <figure className={`${styles.galleryItem} ${styles.galleryItem1} ${styles.galleryPicHover}`}>
            <img
              className={styles.galleryImg}
              src="https://images.squarespace-cdn.com/content/v1/5a624f6adc2b4ab82d97869c/1516738474289-Q40FGT9YTSXAG65929D6/english-cocker-spaniel-canis-lupus-familiaris-puppy-nick-ridley-X.jpg?format=1500w"
              alt="aussie"
            />
          </figure>
          <figure className={`${styles.galleryItem} ${styles.galleryItem2} ${styles.galleryPicHover}`}>
            <img
              className={styles.galleryImg}
              src="https://www.puppyleaks.com/wp-content/uploads/2014/12/doggieplay-e1419098147595.png"
              alt="aussie"
            />
          </figure>
          <figure className={`${styles.galleryItem} ${styles.galleryItem3} ${styles.galleryPicHover}`}>
            <img
              className={styles.galleryImg}
              src="https://i.ytimg.com/vi/aHqckA4fBTg/maxresdefault.jpg"
              alt="aussie"
            />
          </figure>
          <figure className={`${styles.galleryItem} ${styles.galleryItem4} ${styles.galleryPicHover}`}>
            <img
              className={styles.galleryImg}
              src="https://www.petassure.com/petassure/file-streams/page/azv5xvCmlgF755Hr00Mxu5wobblers.jpg"
              alt="aussie"
            />
          </figure>
          <figure className={`${styles.galleryItem} ${styles.galleryItem5} ${styles.galleryPicHover}`}>
            <img
              className={styles.galleryImg}
              src="https://www.thesprucepets.com/thmb/9Q0btGDhmCtyAV5sFzZy9aCnoZs=/1500x844/smart/filters:no_upscale()/GettyImages-867302186-bb5f891abaad4c378b8b71c54c8940dd.jpg"
              alt="aussie"
            />
          </figure>
          <figure className={`${styles.galleryItem} ${styles.galleryItem6} ${styles.galleryPicHover}`}>
            <img
              className={styles.galleryImg}
              src="https://image.freepik.com/free-photo/vertical-shot-dog-standing-outdoors-sunset-looking-sideways_181624-50183.jpg"
              alt="aussie"
            />
          </figure>
        </div>
      </div>
   
        
    );
}

export default DogCollage;