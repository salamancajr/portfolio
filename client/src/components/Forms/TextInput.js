import React from 'react'

export default (field) => (
    <div class="form-group">
    <label>{field.label}</label>
    <input
        class="form-control"
        type={field.type}
        {...field.input}
    />
    <span style={{ color: 'red'}}>
    {field.meta.error}
    </span>
  </div>
)