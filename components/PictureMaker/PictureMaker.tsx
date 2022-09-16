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
    const json = await result.json();
    if (result.status === 201) {
      send('success', {
        value: {
          location: json.location,
        },
      });
    } else {
      console.log(json);
      send('error', {
        value: json,
      });
    }
  };

  const states = {
    idle: <Idle onSubmit={handleSubmit} />,
    loading: <Loading />,
    result: <Result state={state} reset={() => send('reset')} />,
    error: <ErrorIndicator state={state} reset={() => send('reset')} />,
  };

  return (
    <>
      {states[state.value as keyof typeof states]}
      {/* <pre dir='ltr'>{JSON.stringify(state, null, 2)}</pre> */}
    </>
  );
};
