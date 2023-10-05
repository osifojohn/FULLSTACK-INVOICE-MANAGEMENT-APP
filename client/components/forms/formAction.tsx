'use client';
interface FormActionProps {
  handleSubmit: (val: any) => any;
  type?: any;
  action?: any;
  text: string;
  isLoading?: boolean;
  isDemo?: boolean;
}

export default function FormAction({
  handleSubmit,
  type = 'Button',
  action = 'submit',
  text,
  isLoading = false,
  isDemo = false,
}: FormActionProps) {
  return (
    <>
      {type === 'Button' ? (
        <button
          type={action}
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  ${
            isDemo
              ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
              : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
          } focus:outline-none focus:ring-2 focus:ring-offset-2  mt-10`}
          onSubmit={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Loading' : text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
