"use client";

import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// Hàm tạo ID ngẫu nhiên
function randomID(len = 5) {
  let result = "";
  const chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

// Hàm lấy tham số từ URL
function getUrlParams(url = "") {
  if (typeof window !== "undefined") {
    const urlStr = url.split("?")[1];
    return new URLSearchParams(urlStr);
  }
  return null;
}

export default function VideoPage() {
  const containerRef = useRef(null); // Tham chiếu đến container để hiển thị video call

  useEffect(() => {
    // Lấy RoomID từ URL hoặc tạo RoomID mới nếu không có trong URL
    let roomID = getUrlParams(window.location.href)?.get("roomID");

    // Nếu không có RoomID trong URL, tạo RoomID mới và cập nhật URL
    if (!roomID) {
      roomID = randomID(10); // Tạo RoomID ngẫu nhiên
      const newUrl = `${window.location.origin}${window.location.pathname}?roomID=${roomID}`;
      window.history.replaceState(null, "", newUrl); // Cập nhật URL mà không reload trang
    }

    console.log("Room ID:", roomID); // Debug để kiểm tra RoomID

    const initMeeting = async () => {
      const appID = 567166045; // App ID từ Zego Cloud
      const serverSecret = "585b4598a38fe4a5fa0b419988d01abc"; // Server Secret từ Zego Cloud

      // Tạo Kit Token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(5), // Tên người dùng ngẫu nhiên
        randomID(5)  // User ID ngẫu nhiên
      );

      // Tạo instance ZegoUIKitPrebuilt
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Join vào phòng
      zp.joinRoom({
        container: containerRef.current, // Render video call trong container này
        sharedLinks: [
          {
            name: "Copy link",
            url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}`, // Tạo link chia sẻ với RoomID hiện tại
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // Chế độ Group Call
        },
      });
    };

    initMeeting();
  }, []);

  return (
    <div
      className="myCallContainer"
      ref={containerRef} // Container để render video call
      style={{ width: "100vw", height: "100vh" }} // Toàn màn hình
    ></div>
  );
}
