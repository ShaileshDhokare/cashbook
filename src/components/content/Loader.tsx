import { Spinner } from '../ui/spinner';

const Loader = ({ show }: { show: boolean }) => {
  return show ? (
    <div className='flex justify-center items-center w-full h-full'>
      <Spinner className='size-8' />
    </div>
  ) : null;
};

export default Loader;
