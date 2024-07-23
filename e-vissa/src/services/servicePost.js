const { Post, User } = require('@/dbx/e-vissa/models');

export async function getAllPostSlugs() {
    try {
        const result = await Post.findAll({
            attributes: ['slug'],
        });
        return result;
    } catch (error) {
        return null;
    }
}

export async function getPost(slug, condition = { published: 1 }) {
    const where = {
        slug,
        ...condition,
    };
    try {
        const result = await Post.findOne({
            raw: true,
            nest: true,
            where,
            include: [
                {
                    model: User,
                    as: 'created_by_info',
                    attributes: ['first_name', 'last_name'],
                },
                {
                    model: User,
                    as: 'updated_by_info',
                    attributes: ['first_name', 'last_name'],
                },
            ],
        });

        if (result !== null) {
            // Update view
            const views = result?.views + 1;

            await Post.update(
                { views, updated_at: result.updated_at },
                {
                    where: {
                        slug,
                    },
                    silent: true, // Disable the default timestamps update
                },
            );
        }

        return result;
    } catch (error) {
        return null;
    }
}

export async function addIdForHeading() {
    const posts = await Post.findAll({
        attributes: ['id', 'content'],
    });
    const result = [];
    posts.forEach(async (post) => {
        // regex pattern for h2, h3 tag
        let regex = /<(h2|h3)[^>]*>.*?<\/\1>/g;
        // Array to store all matches
        let matches = [];
        // Match all occurrences of substrings containing <h2> and <h3> tags
        let match;
        // check h2,h3 and push to matches
        while ((match = regex.exec(post.content)) !== null) {
            matches.push(match[0]);
        }

        let extractedContent = [];
        let headingTags = [];

        matches.forEach(function (item) {
            // Extract text content within <h2> or <h3> tags
            var content = item.replace(/<\/?[^>]+(>|$)/g, '').trim();

            // Derive id from text content
            var id = content.replace(/\s+/g, '-').toLowerCase();
            // Add id attribute to the tag
            var updatedTag = item.replace(/(<(h2|h3)[^>]*)(>.*?<\/\2>)/, function (match, openingTag, tag, closingTag) {
                headingTags.push({ id, text: content, type: tag });
                return `${openingTag} id="${id}"${closingTag}`;
            });
            extractedContent.push(updatedTag);
        });

        let newPost = {};
        newPost.content = post.content.replace(regex, function () {
            return extractedContent.shift();
        });
        newPost.heading_tags = JSON.stringify(headingTags);
        const [isUpdated] = await Post.update(newPost, {
            where: {
                id: post.id,
            },
        });
        if (!isUpdated) {
            result.push(id);
        }
    });

    return result;
}

export async function replaceTextInContent(oldText, newText) {
    const posts = await Post.findAll({
        attributes: ['id', 'content'],
    });

    const result = [];

    posts.forEach(async (post) => {
        const modifiedContent = post.content.replace(new RegExp(oldText, 'g'), newText);

        const [isUpdated] = await Post.update(
            { content: modifiedContent },
            {
                where: {
                    id: post.id,
                },
            },
        );

        if (!isUpdated) {
            result.push(post.id);
        }
    });

    return result;
}
