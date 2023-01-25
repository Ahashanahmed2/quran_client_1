import React, { useContext } from "react";

import {Mo} from "../mobile/CenterMobile";

export default function TopSubject() {
  const M  = useContext(Mo);

  return (
    <div className="text-center ">
      <div
       
        type="button"
        onClick={() => {
          M.unset === true ? M.setF(false) : M.setF(true);
        }}
      >
        SUBJECT
      </div>
    </div>
  );
}
