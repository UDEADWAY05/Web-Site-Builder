export function generateScript() {
  return `function handleSubmit(event) {
          event.preventDefault();
          const formData = new FormData(event.target);
          const data = {};
          for (let [key, value] of formData.entries()) {
            data[key] = value;
          }
          window.parent.postMessage({ type: 'form-submission', data: data }, '*')
        }`
}
