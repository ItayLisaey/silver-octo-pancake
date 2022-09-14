import { ErrorIndicator } from './states/ErrorIndicator';
import { Idle } from './states/Idle/Idle';
import { Loading } from './states/Loading';
import { Result } from './states/Result';
import { usePictureMaker } from './usePictureMaker';
export interface PictureMakerProps {}

export const PictureMaker = (props: PictureMakerProps) => {
  const [state, send] = usePictureMaker();

  const handleSubmit = async (value: string) => {
    send('submit-prompt');

    const result = await fetch(`/api/prompt?p=${value}`);
    if (result.ok) {
      const json = await result.json();
      send('success', {
        value: {
          location: json.location,
        },
      });
    } else {
      send('error');
    }
  };

  const states = {
    idle: <Idle onSubmit={handleSubmit} />,
    loading: <Loading />,
    result: <Result state={state} reset={() => send('reset')} />,
    error: <ErrorIndicator reset={() => send('reset')} />,
  };

  return states[state.value as keyof typeof states];
};
