type SignUpBtnTypes = {
  dataTestId: string;
  type: 'submit' | 'reset' | 'button';
  className: string;
  description: string;
};

const SignUpBtn = ({ dataTestId, type, className, description }: SignUpBtnTypes) => {
  return (
    <button data-testid={dataTestId} type={type} className={className}>
      {description}
    </button>
  );
};

export default SignUpBtn;
