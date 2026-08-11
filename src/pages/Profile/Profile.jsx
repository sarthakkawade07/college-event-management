import { useState } from "react";
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
  // ==========================================
  // GET LOGGED IN USER
  // ==========================================

  const [user, setUser] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("loggedInUser")
      ) || null
    );
  });

  // ==========================================
  // EDIT MODE
  // ==========================================

  const [isEditing, setIsEditing] = useState(false);

  // ==========================================
  // PROFILE IMAGE
  // ==========================================

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt3N8dk17zsL3PqM3AYYnWveHlUqYAmeMUeKOepZcFwg&s"
  );

  // ==========================================
  // IMAGE CHANGE
  // ==========================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result);

      localStorage.setItem(
        "profileImage",
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  // ==========================================
  // NO USER
  // ==========================================

  if (!user) {
    return (
      <div className="profile-page">
        <h2>No User Logged In</h2>
      </div>
    );
  }

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = () => {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(user)
    );

    alert("Profile Updated Successfully!");

    setIsEditing(false);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="profile-page">

      {/* ================= PROFILE IMAGE ================= */}

      <div className="profile-image-wrapper">

        <img
          src={profileImage}
          alt="Profile"
          className="profile-image"
        />

        {isEditing && (
          <>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

            <label
              htmlFor="profile-upload"
              className="camera-btn"
            >
              <FaCamera />
            </label>
          </>
        )}

      </div>

      {/* ================= USER NAME ================= */}

      {isEditing ? (

        <input
          type="text"
          value={user.fullName || ""}
          onChange={(e) =>
            setUser({
              ...user,
              fullName: e.target.value,
            })
          }
          className="edit-input"
        />

      ) : (

        <h1>
          {user.fullName}
        </h1>

      )}

      {/* ================= ROLE ================= */}

      <p className="role">
        {user.department || "Student"} Student
      </p>

      {/* ================= PROFILE INFO ================= */}

      <div className="profile-info">

        {/* EMAIL */}

        <div className="info-row">

          <FaEnvelope />

          <span>
            {user.email}
          </span>

        </div>

        {/* MOBILE */}

        <div className="info-row">

          <FaPhone />

          {isEditing ? (

            <input
              type="text"
              value={user.mobile || ""}
              onChange={(e) =>
                setUser({
                  ...user,
                  mobile: e.target.value,
                })
              }
              className="edit-input"
            />

          ) : (

            <span>
              {user.mobile}
            </span>

          )}

        </div>

        {/* COLLEGE */}

        <div className="info-row">

          <FaGraduationCap />

          {isEditing ? (

            <input
              type="text"
              value={user.college || ""}
              onChange={(e) =>
                setUser({
                  ...user,
                  college: e.target.value,
                })
              }
              className="edit-input"
            />

          ) : (

            <span>
              {user.college}
            </span>

          )}

        </div>

        {/* YEAR */}

        <div className="info-row">

          <FaUser />

          {isEditing ? (

            <select
              value={user.year || ""}
              onChange={(e) =>
                setUser({
                  ...user,
                  year: e.target.value,
                })
              }
              className="edit-input"
            >
              <option value="">
                Select Year
              </option>

              <option value="First Year">
                First Year
              </option>

              <option value="Second Year">
                Second Year
              </option>

              <option value="Third Year">
                Third Year
              </option>

              <option value="Final Year">
                Final Year
              </option>
            </select>

          ) : (

            <span>
              {user.year}
            </span>

          )}

        </div>

      </div>

      {/* ================= BUTTON ================= */}

      {isEditing ? (

        <button
          className="edit-btn"
          onClick={handleSave}
        >
          <FaEdit />
          Save Changes
        </button>

      ) : (

        <button
          className="edit-btn"
          onClick={() =>
            setIsEditing(true)
          }
        >
          <FaEdit />
          Edit Profile
        </button>

      )}

    </div>
  );
}

export default Profile;