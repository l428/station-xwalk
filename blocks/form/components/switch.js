import {createHelpText} from '../util.js';
import {createRadioOrCheckbox} from '../form.js';

export default async function decorate(fieldDiv, fd) {
    const wrapper = createRadioOrCheckbox({...fd, fieldType: 'checkbox'});
    if (fd.description) {
      wrapper.append(createHelpText(fd));
      wrapper.dataset.description = fd.description; // In case overriden by error message
    }
    // remove checkbox class from wrapper div
    wrapper.classList.remove('checkbox-wrapper');
    // add switch class from wrapper div
    wrapper.classList.add('switch-wrapper');
    const input = wrapper.querySelector('input');
    if(fd.required){
      input.required = true;
    }
    input.id = fd.id;
    input.name = fd.name;
    input.readOnly = fd.readOnly;
    input.autocomplete = fd.autoComplete ?? 'off';
    input.disabled = fd.enabled === false;
    input.value = fd?.enum?.[0] ?? 'on';
    input.checked = fd.value === input.value;

    const switchWrapper = document.createElement('div');
    switchWrapper.classList.add('switch');
    const slider = document.createElement('span');
    slider.classList.add('slider');
    switchWrapper.append(input.cloneNode(true));
    switchWrapper.append(slider);
    wrapper.replaceChild(switchWrapper, input);
  
    slider.addEventListener('click', () => {
      const inputEle = wrapper.querySelector('input');
      inputEle.checked = !inputEle.checked;
      const changeEvent = new CustomEvent('change', { bubbles: true });
      inputEle.dispatchEvent(changeEvent);
    });
  
    return wrapper;
}