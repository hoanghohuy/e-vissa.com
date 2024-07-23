import { presenceRef } from '@/libs/firebase';
import { useEffect, useState } from 'react';
import { onValue, child, set, onDisconnect } from 'firebase/database';
import { useSession } from 'next-auth/react';

const UserStatus = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session && session.accessToken) {
            const userIdString = String(session.user?.name);
            const userStatusRef = child(presenceRef, userIdString);
            // Set the user's online status to true when they connect
            set(userStatusRef, true);

            // Remove the user when they disconnect or close the browser
            const disconnectRef = onDisconnect(userStatusRef);
            disconnectRef.set(false);
        }
    }, [session]);

    useEffect(() => {
        const handleOnlineStatus = (snapshot) => {
            if (snapshot.exists()) {
                const users = Object.entries(snapshot.val())
                    .filter(([userId, value]) => value === true)
                    .map(([userId]) => userId);
                setOnlineUsers(users);
            } else {
                setOnlineUsers([]);
            }
        };

        // Subscribe to online status changes
        const unsubscribe = onValue(presenceRef, handleOnlineStatus);

        return () => {
            // Unsubscribe when the component is unmounted
            unsubscribe();
        };
    }, []);

    return (
        <div className="inline-flex gap-1 font-inter text-[13px] bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
            {onlineUsers.length > 0 && onlineUsers.map((userId, index) => <span key={index}>{userId}, </span>)} đang làm
            việc rất chăm chỉ!
        </div>
    );
};

export default UserStatus;
