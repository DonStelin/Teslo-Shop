import { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import styles from './styles.module.css';
interface Props {
  images: string[];
}

export const ProductSlideShow: FC<Props> = ({ images }) => {
  return (
    <Slide easing="ease" duration={5000} indicators>
      {images.map((img) => {
        return (
          <div className={styles['each-slide']} key={img}>
            <div
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
