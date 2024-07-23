'use client';
import React, { useEffect, useState } from 'react';

export default function page() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAll = async () => {
        try {
            setLoading(true);
            const a = await fetch('/api/posts');
            if (a.status === 200) {
                const resp = await a.json();
                const dataPost = resp.data;
                const dataLink = dataPost.map((item) => ({
                    tieude: item.title,
                    link: `${process.env.NEXT_PUBLIC_SITE_URL}/${item.category_info[0].slug}/${item.slug}`,
                }));
                setData(dataLink);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="p-4">
            <h1 className="mb-4">Danh sách toàn bộ bài viết: {data.length} bài viết</h1>
            {loading
                ? 'Loading...'
                : data.map((item, index) => (
                      <div className="text-[13px]">
                          {index + 1}. Bài viết: {item.tieude} (
                          <a className="underline" href={item.link} target="_blank">
                              {item.link}
                          </a>
                          )
                      </div>
                  ))}
        </div>
    );
}
