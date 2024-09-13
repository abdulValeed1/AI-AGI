export const useEnterSubmit = ({ onSubmit }) => {
    const handleKeyDown = (event) => {
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.nativeEvent.isComposing
      ) {
        event.preventDefault();
        onSubmit();
      }
    };
  
    return { onKeyDown: handleKeyDown };
  };