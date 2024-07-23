import React from 'react';
import PostPage from './postsPage';

export const metadata = {
    title: 'Posts | Admin E-vissa',
    description: 'Posts | Admin E-vissa',
};

export default function page() {
    return (
        <>
            <PostPage />;
        </>
    );
}
