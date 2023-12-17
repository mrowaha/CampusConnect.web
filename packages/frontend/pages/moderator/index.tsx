import React from 'react';
import Link from 'next/link';

const ModeratorSidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        {/* <li><Link href="/moderator/dashboard">Dashboard</Link></li> */}
        {/* <li><Link href="/moderator/profile">Profile Info</Link></li> */}
        {/* <li><Link href="/moderator/inbox">Inbox</Link></li> */}
        <li><Link href="/moderator/tagApplication">Tag Applications</Link></li>
        <li><Link href="/moderator/approvedTags">Approved tags</Link></li>
        {/* <li><Link href="/moderator/manage-reports">Manage reports</Link></li> */}
        {/* <li><Link href="/moderator/resolved-reports">Resolved reports</Link></li> */}
        <li><Link href="/moderator/settings">Settings</Link></li>
      </ul>
    </div>
  );
}

export default ModeratorSidebar;