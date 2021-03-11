// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
try {
  document.addEventListener('DOMContentLoaded', function () {
    var btn0 = document.querySelector('#invert0')
    btn0.addEventListener('click', function () {
      chrome.tabs.executeScript(null,
        { code: "document.documentElement.style.filter='invert(1)'" });
      window.close();
    });

    var btn1 = document.querySelector('#invert')
    btn1.addEventListener('click', function () {
      chrome.tabs.executeScript(null,
        { code: "document.body.style.filter='invert(1)'" });
      window.close();
    });

    var btn2 = document.querySelector('#reset')
    btn2.addEventListener('click', function () {
      chrome.tabs.executeScript(null,
        { code: "document.body.style.filter='unset';document.documentElement.style.filter='unset'" });
      window.close();
    });
  });

} catch (error) {
  console.log(error)
}