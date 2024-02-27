import React from "react";

const ProfileForm = ({ name, email }) => {
  return (
    <section className="flex items-center justify-end">
      <section>
        <h2 className="text-lg font-semibold text-right">{name}</h2>
        <h2 className="text-gray-600 text-right">{email}</h2>
      </section>
    </section>
  );
};

export default ProfileForm;
