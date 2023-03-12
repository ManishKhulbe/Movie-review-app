import React, { useState } from "react";
import LiveSearch from "../admin/LiveSearch";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};
const CastForm = () => {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const { leadActor } = castInfo;
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadActor"
        className="w-4 h-4"
        checked={leadActor}
      />
      <LiveSearch placeholder="Search profile.."/>
    </div>
  );
};

export default CastForm;
