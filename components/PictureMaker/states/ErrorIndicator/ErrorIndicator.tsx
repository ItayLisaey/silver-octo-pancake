import { PictureMakerState } from '../../usePictureMaker';
import classes from './error-indicator.module.scss';

export interface ErrorIndicatorProps {
  state: PictureMakerState;
  reset: () => void;
}

export const ErrorIndicator = (props: ErrorIndicatorProps) => {
  const generateMessage = () => {
    const error = props.state.event.value;
    console.log('state error', error);
    if (error?.code === 402) {
      return 'לצערי אזלה יכולת ההוצאה החודשית של הפרוייקט, נסו שוב בחודש הבא.';
    }
    return 'שגיאה בעת עיבוד הטקסט, נסו שוב.';
  };

  return (
    <div className={classes.container}>
      <h3>{generateMessage()}</h3>
      <button onClick={props.reset}>אפס</button>
    </div>
  );
};
