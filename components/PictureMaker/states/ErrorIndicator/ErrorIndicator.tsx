import classes from './error-indicator.module.scss';

export interface ErrorIndicatorProps {
  reset: () => void;
}

export const ErrorIndicator = (props: ErrorIndicatorProps) => {
  return (
    <div className={classes.container}>
      <h3>שגיאה בעת עיבוד הטקסט, נסו שוב.</h3>
      <button onClick={props.reset}>אפס</button>
    </div>
  );
};
