/* eslint-disable*/

import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const handleDisplayUserPhoto = (e) => {
  const userImgEl = document.querySelector('.form__user-photo');
  const navBarImg = document.querySelector('.nav__user-img');
  const imgFile = e.target.files[0];

  if (!imgFile.type.startsWith('image/')) return;
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    userImgEl.setAttribute('src', reader.result);
    navBarImg.setAttribute('src', reader.result);
  });

  reader.readAsDataURL(imgFile);
};
