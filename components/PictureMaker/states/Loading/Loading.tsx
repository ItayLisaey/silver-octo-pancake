import Image from 'next/image';

export interface LoadingProps {}

export const Loading = (props: LoadingProps) => {
  return (
    <div>
      <Image src='/loading.svg' alt='' width={75} height={75} />
    </div>
  );
};
