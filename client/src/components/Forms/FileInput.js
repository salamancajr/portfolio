import React from 'react'

export default (field) => (
  <div class="input-group mb-3">
    <div class="custom-file">
      <input
        type="file"
        class="custom-file-input"
        id="inputGroupFile01"
        aria-describedby="inputGroupFileAddon01"
        {...field.input}
        value={null}
      />
      {field.meta.error}
      <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
    </div>
  </div>
)
