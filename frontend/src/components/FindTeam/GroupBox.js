import TeamStyle from "./FindTeam.module.css";
import axiosInstance from "../../ultilities/axiosInstance";

function GroupBox(props) {
  const joinGroup = async () => {
    try {
      const response = await axiosInstance.post(
        `/courses/${props.courseId}/teams/${props.teamId}/students`
      );
      
      window.location = `/team/${props.courseId}`;
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  };

  const leaveGroup = async () => {
    try {
      const response = await axiosInstance.delete(
        `/courses/${props.courseId}/teams/${props.teamId}/students`
      );
      window.location = `/team/${props.courseId}`;
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message);
    }
  };

  return (
    <div className={TeamStyle.groupBox}>
      <div className={TeamStyle.groupHeader}>
        <div className={TeamStyle.groupTitle}>
          <h2 className={TeamStyle.groupLabel}>{props.name}</h2>
        </div>
        <span className={TeamStyle.groupStudent}>{props.member} students</span>
        <span className={TeamStyle.groupJoin}>
          {props.teamId != props.id ? (
            <button className={TeamStyle.joinBtn} onClick={joinGroup}>
              Join Group
            </button>
          ) : (
            <button className={TeamStyle.leaveBtn} onClick={leaveGroup}>
              Leave Group
            </button>
          )}
        </span>
      </div>
    </div>
  );
}

export default GroupBox;
