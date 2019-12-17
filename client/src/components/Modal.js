import React from 'react'

export default props => (
  <div class="modal fade bd-example-modal-xl" id={props.control} tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
    <div style={{ height: '100vh', pointerEvents: 'none', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <div class="modal-dialog modal-xl" role="document">
        {props.children}
      </div>
    </div>
  </div>
)
