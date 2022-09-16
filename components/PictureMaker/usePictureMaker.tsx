import { useMachine } from '@xstate/react';
import {
  assign,
  BaseActionObject,
  createMachine,
  ResolveTypegenMeta,
  ServiceMap,
  State,
  TypegenDisabled,
} from 'xstate';

type ContextObject = {
  result?: {
    location: string;
  };
  error?: {
    code: number;
    message: string;
  };
};

type EventObject = {
  type: string;
  value: any;
};

export type PictureMakerState = State<
  ContextObject,
  EventObject,
  any,
  {
    value: any;
    context: ContextObject;
  },
  ResolveTypegenMeta<TypegenDisabled, EventObject, BaseActionObject, ServiceMap>
>;

export const pictureMakerMachine = createMachine<ContextObject, EventObject>({
  id: 'PictureMaker',
  predictableActionArguments: true,
  schema: {
    context: {} as ContextObject,
  },
  initial: 'idle',
  context: {
    result: undefined,
    error: undefined,
  },
  states: {
    idle: {
      on: {
        'submit-prompt': {
          target: 'loading',
        },
      },
    },
    loading: {
      on: {
        success: {
          actions: assign({
            result: (context, event) => event.value,
          }),
          target: 'result',
        },
        error: {
          actions: assign({
            error: (context, event) => {
              console.log('event', event);
              return event.value;
            },
          }),
          target: 'error',
        },
      },
    },
    result: {
      on: {
        reset: {
          target: 'idle',
        },
      },
    },
    error: {
      on: {
        reset: {
          target: 'idle',
        },
      },
    },
  },
});

export const usePictureMaker = () => useMachine(pictureMakerMachine);
