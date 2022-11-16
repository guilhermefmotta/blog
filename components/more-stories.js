import PostPreview from '../components/post-preview'

export default function MoreStories({ posts }) {
  return (
    <section className='container mx-auto w-2/3'>
      <div className="grid grid-cols-1  gap-x-12 gap-y-12 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            timeReader={post.timeReader}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
