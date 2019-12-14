import React from 'react'

export default (field) => (
    <div class="form-group">
    <label>{field.label}</label>
    <textarea
        class="form-control"
        rows="10"
        {...field.input}
    >
    </textarea>
    {field.meta.error}
  </div>
)