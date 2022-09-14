import Image from 'next/image';
import { PictureMakerState } from '../../usePictureMaker';
import classes from './result.module.scss';

export interface ResultProps {
  state: PictureMakerState;
  reset: () => void;
}

export const Result = (props: ResultProps) => {
  return (
    <div className={classes.container}>
      {props.state.context.result && (
        <Image
          src={props.state.context.result.location}
          alt=''
          layout='responsive'
          width={500}
          height={500}
        />
      )}
      <button onClick={props.reset}>אפס</button>
    </div>
  );
};
