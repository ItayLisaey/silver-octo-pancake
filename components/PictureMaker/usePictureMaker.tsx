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
  error?: string;
};

type EventObject = {
  type: string;
  value: {
    location: string;
  };
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
          actions: assign({ result: (context, event) => event.value }),
          target: 'result',
        },
        error: {
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
