const StepConfirm: React.FC<{
  handleOnboardingSubmit: (e: React.FormEvent) => void;
}> = ({ handleOnboardingSubmit }) => {
  return (
    <div>
      <h2>Is everything correct?</h2>
      <p>
        If you want to make any changes, you can go back. Otherwise, please
        confirm your information.
      </p>
      <button type="submit" onClick={handleOnboardingSubmit}>
        Confirm and Continue
      </button>
    </div>
  );
};

export default StepConfirm;
