import { useEffect, useState } from "react";
import "./Profile.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaEdit,
  FaCamera,
} from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
  localStorage.getItem("profileImage") ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt3N8dk17zsL3PqM3AYYnWveHlUqYAmeMUeKOepZcFwg&s"
);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>No User Logged In</h2>
        </div>
      </div>
    );
  }
  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    setProfileImage(reader.result);
    localStorage.setItem("profileImage", reader.result);
  };

  reader.readAsDataURL(file);
};

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-image-wrapper">
  <img
    src={profileImage}
    alt="Profile"
    className="profile-image"
  />

  {isEditing && (
    <>
      <label htmlFor="profile-upload" className="camera-btn">
        <FaCamera />
      </label>

      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        hidden
      />
    </>
  )}
</div>

        {isEditing ? (
  <input
    type="text"
    value={user.fullName}
    onChange={(e) =>
      setUser({
        ...user,
        fullName: e.target.value,
      })
    }
    className="edit-input"
  />
) : (
  <h2>{user.fullName}</h2>
)}

        <p className="role">{user.department} Student</p>

        <div className="profile-info">

          <div className="info-row">
            <FaEnvelope />
            <span>{user.email}</span>
          </div>

          <div className="info-row">
  <FaPhone />

  {isEditing ? (
    <input
      type="text"
      value={user.mobile}
      onChange={(e) =>
        setUser({
          ...user,
          mobile: e.target.value,
        })
      }
      className="edit-input"
    />
  ) : (
    <span>{user.mobile}</span>
  )}
</div>

         <div className="info-row">
  <FaGraduationCap />

  {isEditing ? (
    <input
      type="text"
      value={user.college}
      onChange={(e) =>
        setUser({
          ...user,
          college: e.target.value,
        })
      }
      className="edit-input"
    />
  ) : (
    <span>{user.college}</span>
  )}
</div>

          <div className="info-row">
  <FaUser />

  {isEditing ? (
    <select
      value={user.year}
      onChange={(e) =>
        setUser({
          ...user,
          year: e.target.value,
        })
      }
      className="edit-input"
    >
      <option value="First Year">First Year</option>
      <option value="Second Year">Second Year</option>
      <option value="Third Year">Third Year</option>
      <option value="Final Year">Final Year</option>
    </select>
  ) : (
    <span>{user.year}</span>
  )}
</div>

        </div>

        <button
  className="edit-btn"
  onClick={() => setIsEditing(!isEditing)}
>
  <FaEdit />
  {isEditing ? "Cancel" : "Edit Profile"}
</button>
{isEditing && (
  <button
    className="edit-btn save-btn"
    onClick={() => {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      alert("Profile Updated Successfully!");

      setIsEditing(false);
    }}
  >
    Save Changes
  </button>
)}

      </div>
    </div>
  );
}

export default Profile;