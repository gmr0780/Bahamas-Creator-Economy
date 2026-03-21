import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/db";
import { isAuthenticated } from "../../../../../lib/auth";

export const dynamic = "force-dynamic";

const seedGuides = [
  {
    slug: "getting-started",
    title: "Getting Started as a Creator",
    subtitle: "Your first steps into the creator economy",
    icon: "\u{1F680}",
    order: 1,
    published: true,
    content: `## Welcome to the Creator Economy

The creator economy is one of the fastest-growing industries in the world, and as a Bahamian, you have a unique advantage. Your culture, your stories, your perspective — these are things nobody else can offer. Whether you want to share your love of Junkanoo, teach the world about island life, review the latest tech, or build a fitness brand, there is an audience waiting for you.

This guide will walk you through everything you need to take your first steps as a digital creator. No experience required — just a willingness to start.

## Choosing Your Niche

Your niche is the specific topic or area you will focus on. The best niche sits at the intersection of three things: what you are passionate about, what you are knowledgeable about, and what your audience needs.

- **Start with your passions.** What could you talk about for hours without getting bored? Cooking, fashion, gaming, fitness, travel, music?
- **Consider your expertise.** What do people already come to you for advice on? What skills have you developed?
- **Research the demand.** Search YouTube and TikTok for topics you are considering. Are people watching this content? Are there gaps you could fill?
- **Think Bahamian.** As a Bahamian creator, you have unique cultural stories to tell. Content about island life, Bahamian cuisine, Caribbean travel, and local perspectives can resonate globally.

Do not overthink this step. You can always refine your niche later. The most important thing is to pick something and start creating.

## Setting Up Your Accounts

Before you create your first piece of content, get your accounts set up properly.

- **Choose a brand name.** Pick something memorable, easy to spell, and available across platforms. Check availability on YouTube, TikTok, Instagram, and X before committing.
- **Create accounts on your primary platforms.** You do not need to be everywhere at once. Start with one or two platforms that fit your content style.
- **Write a strong bio.** Your bio should clearly communicate who you are and what value you provide. Keep it concise and include a call to action.
- **Use a consistent profile picture.** Your face or a clean logo — the same image across all platforms builds recognition.
- **Set up a professional email.** Create a dedicated email for brand inquiries. Something like yourname.creator@gmail.com works perfectly.

## Essential Equipment

Here is the truth that many new creators do not want to hear: you do not need expensive equipment to start. Your smartphone is more than enough.

- **Your phone is your studio.** Modern smartphones shoot incredible video. The iPhone and Samsung Galaxy lines both produce content that performs well on every platform.
- **Lighting matters more than camera quality.** Natural light is free and looks amazing. Face a window when you film, and your content will immediately look more professional.
- **Audio is critical.** Viewers will tolerate average video quality, but poor audio makes people click away instantly. A basic clip-on microphone for twenty to thirty dollars is the single best investment you can make.
- **A simple tripod or phone stand.** Shaky footage looks unprofessional. A basic phone tripod costs under fifteen dollars and makes a huge difference.
- **Free editing software.** CapCut is free, powerful, and runs on your phone. You can create professional-looking content without spending a cent.

Upgrade your equipment as your channel grows and generates revenue. Do not let the lack of fancy gear stop you from starting today.

## Creating Your First Piece of Content

This is the hardest part — and the most important. Your first video, post, or reel will not be perfect, and that is completely fine. Every creator you admire started with content that was rough around the edges.

- **Just press record.** The difference between creators who succeed and those who do not is simple — the successful ones actually started.
- **Keep it simple.** Share a tip, tell a story, show a process, or teach something you know. Do not try to create a masterpiece on your first attempt.
- **Aim for progress, not perfection.** Your tenth video will be better than your first. Your fiftieth will be dramatically better. Growth comes from repetition.
- **Study what works.** Watch creators in your niche who are successful. What do their thumbnails look like? How do they structure their videos? How long are they?
- **Post it.** Do not let it sit in your drafts forever. Post it, learn from it, and make the next one better.

## Setting Up Your Creator Workspace

You do not need a dedicated studio, but having a consistent space to create helps build a routine.

- **Find a quiet corner.** Consistent background noise ruins audio. Find the quietest spot in your home.
- **Create a simple backdrop.** A clean wall, a bookshelf, or even a plain sheet can work as a background. Keep it uncluttered.
- **Organize your tools.** Keep your phone, tripod, microphone, and any props in one place so you can create whenever inspiration strikes.
- **Good internet connection.** Uploading content requires decent bandwidth. If your home internet is slow, consider finding a reliable spot with fast WiFi for uploads.

## Building Your Content Calendar

Consistency is the number one factor in growing as a creator. A content calendar helps you stay on track.

- **Decide on a posting frequency.** Start with what you can sustain. Two videos per week is better than seven videos the first week and then nothing for a month.
- **Batch your content.** Film multiple pieces of content in one session. This is far more efficient than creating one piece at a time.
- **Plan ahead.** Use a simple spreadsheet or a free tool like Notion to plan your content for the next two to four weeks.
- **Leave room for trending topics.** Keep some flexibility in your schedule to jump on trends and timely content.
- **Track what performs.** After a few weeks, review which content got the most views and engagement. Do more of what works.

Your creator journey starts with a single piece of content. The Bahamas has incredible stories to tell, and the world is waiting to hear yours. Pick your niche, set up your accounts, and start creating today.`,
  },
  {
    slug: "platforms",
    title: "Understanding the Platforms",
    subtitle: "Where to create and what works on each platform",
    icon: "\u{1F4F1}",
    order: 2,
    published: true,
    content: `## Choosing Where to Create

Every social media platform has its own culture, algorithm, and audience. Understanding the strengths of each platform helps you choose where to focus your energy and what type of content to create. As a Bahamian creator, you have the advantage of creating content that appeals to both local and international audiences across all of these platforms.

You do not need to be on every platform. In fact, trying to be everywhere at once is one of the fastest ways to burn out. Choose one or two platforms to master first, then expand.

## YouTube — The Long Game That Pays Off

YouTube is the gold standard for creator monetization. It offers the highest revenue per view of any platform, and content on YouTube has an incredibly long shelf life. A video you post today can still generate views and income years from now.

- **Long-form content** is YouTube's bread and butter. Videos between eight and twenty minutes tend to perform best for ad revenue.
- **YouTube Shorts** lets you post vertical, short-form content under sixty seconds. Shorts are excellent for discovery — new viewers find you through Shorts, then stay for your long-form content.
- **The algorithm rewards watch time.** The more of your video someone watches, the more YouTube promotes it. Focus on creating content that keeps viewers engaged from start to finish.
- **Best for education, entertainment, and storytelling.** If your content involves tutorials, deep dives, reviews, or narrative content, YouTube is your home.
- **Monetization starts at 1,000 subscribers and 4,000 watch hours** for the YouTube Partner Program. For Shorts, you need 1,000 subscribers and 10 million Shorts views in 90 days.

As a Bahamian creator, YouTube is particularly powerful because your content can reach global audiences who are searching for topics you cover, from Caribbean travel guides to Bahamian cooking tutorials.

## TikTok — Rapid Growth and Viral Potential

TikTok is the platform where unknown creators can blow up overnight. The algorithm is uniquely designed to push content from new creators to massive audiences, regardless of follower count.

- **Short-form video** from fifteen seconds to ten minutes. The sweet spot for most creators is thirty seconds to three minutes.
- **The For You Page (FYP)** is the main discovery engine. Unlike other platforms, your content can reach millions even if you have zero followers.
- **Trends drive discovery.** Using trending sounds, formats, and hashtags can dramatically increase your reach. But add your own twist — do not just copy trends exactly.
- **Authenticity wins.** TikTok audiences prefer raw, genuine content over polished production. Talk to the camera like you are talking to a friend.
- **The algorithm tests your content.** TikTok shows your video to a small group first. If they engage (watch to the end, like, comment, share), it pushes the video to a larger audience. This cycle continues as long as engagement stays strong.
- **Monetization** includes the Creator Fund, TikTok Shop, live gifts, and brand sponsorships. The platform is still developing its revenue sharing, so most TikTok creators earn primarily through brand deals.

## Instagram — Visual Brand Building

Instagram is where you build your visual brand and connect with your audience on a personal level. It is particularly strong for lifestyle, fashion, food, travel, and fitness creators.

- **Reels** are Instagram's short-form video format and currently receive the most algorithmic push. If you are creating video content, Reels should be a priority.
- **Stories** are perfect for behind-the-scenes content, polls, questions, and daily updates. Stories build intimacy with your audience.
- **Carousel posts** (multiple images you swipe through) are powerful for educational content. They get saved and shared at high rates, which the algorithm loves.
- **The grid is your portfolio.** Your Instagram profile acts as a visual resume for brands. Keep it cohesive and professional.
- **DMs are where relationships happen.** Respond to direct messages, engage with followers, and build genuine connections.
- **Monetization** includes brand partnerships, affiliate links, Instagram Shop, subscriptions, and badges during live streams.

For Bahamian creators, Instagram's visual nature is perfect for showcasing the beauty of the islands, Bahamian fashion, food photography, and lifestyle content.

## Twitch — Live Streaming and Community

Twitch is the leading live streaming platform, and while it started with gaming, it has expanded into music, cooking, talk shows, art, and more.

- **Live interaction** is Twitch's superpower. Viewers chat with you in real time, creating a sense of community that no other platform matches.
- **Consistency is everything.** Regular streaming schedules help build a loyal audience that knows when to tune in.
- **Community building** on Twitch is unmatched. Subscribers, moderators, and regular viewers form tight-knit communities around streamers.
- **Monetization** comes from subscriptions, bits (virtual tips), ads, and sponsorships. Twitch also has a Partner and Affiliate program.
- **It requires significant time investment.** Successful Twitch streamers often stream for several hours multiple times per week.

## X (Twitter) — Building Authority and Networking

X is not primarily a video platform, but it is one of the most powerful tools for building your personal brand, networking with other creators, and establishing authority in your niche.

- **Threads** are your content format. Write insightful threads about your niche to demonstrate expertise.
- **Engagement is the algorithm.** Reply to others, quote tweet with value, and participate in conversations. The more you engage, the more visibility you get.
- **Networking happens here.** Many brand deals, collaborations, and opportunities start with connections made on X.
- **Real-time relevance.** X is where trending topics break. Being part of timely conversations can give you massive visibility.
- **Build an audience here, monetize elsewhere.** X is best used as a funnel to drive people to your YouTube, newsletter, or products.

## Choosing Your Primary Platform

The best platform for you depends on your content style, your strengths, and your goals.

- **If you love talking on camera and teaching,** start with YouTube.
- **If you want fast growth and enjoy trends,** start with TikTok.
- **If you are highly visual and love lifestyle content,** start with Instagram.
- **If you love live interaction and gaming,** start with Twitch.
- **If you are a strong writer and networker,** start with X.

### Cross-Posting Strategy

Once you have established yourself on one platform, repurpose your content for others. A YouTube video can become a TikTok clip, an Instagram Reel, a Twitter thread, and a blog post. Work smarter by creating once and distributing everywhere.

- **Repurpose, do not recreate.** Take your best-performing content and adapt it for other platforms.
- **Respect each platform's culture.** A TikTok reposted directly to Instagram Reels with the TikTok watermark will not perform well. Adapt the content to fit each platform.
- **Use a scheduling tool.** Tools like Later or Buffer let you schedule posts across multiple platforms from one dashboard.

The platform landscape is always evolving. Stay curious, experiment, and be willing to adapt. The creators who thrive are the ones who understand where their audience is and meet them there.`,
  },
  {
    slug: "growing",
    title: "Growing Your Audience",
    subtitle: "Proven strategies to build a loyal following",
    icon: "\u{1F4C8}",
    order: 3,
    published: true,
    content: `## The Foundation of Growth

Growing an audience is not about luck or going viral. It is about consistently showing up with valuable content, understanding how platforms work, and building genuine connections with the people who watch your content. Every major creator started from zero — and the strategies in this guide are exactly how they grew.

As a Bahamian creator, you are entering the creator economy at the perfect time. The demand for diverse voices and unique perspectives has never been higher. Here is how to build your audience from the ground up.

## Consistency Is King

The single most important factor in growing your audience is consistency. Algorithms on every platform reward creators who post regularly, and audiences follow creators they can rely on.

- **Set a realistic posting schedule.** If you can commit to three videos per week, do that. If two is more sustainable, that is perfectly fine. The key is sticking to whatever schedule you set.
- **Consistency beats frequency.** Posting twice a week every week for six months will grow your channel faster than posting daily for two weeks and then disappearing.
- **Show up even when it feels pointless.** Your early videos might get ten views. That is normal. Those ten viewers are the foundation of your future community.
- **Batch create content.** Dedicate one or two days per week to filming, and another to editing. This is far more efficient than creating one video at a time.

## Understanding Algorithms

Every platform uses an algorithm to decide which content gets shown to more people. Understanding these algorithms is not about gaming the system — it is about creating content that people genuinely enjoy.

- **Watch time is the universal metric.** Every platform rewards content that keeps people watching. If viewers click away in the first few seconds, the algorithm stops promoting your content.
- **Engagement signals matter.** Likes, comments, shares, and saves all tell the algorithm that your content is worth promoting. Encourage engagement naturally within your content.
- **The first hour is critical.** How your content performs in the first sixty minutes after posting strongly influences how far the algorithm pushes it. Post when your audience is most active.
- **Each platform is different.** YouTube prioritizes watch time and click-through rate. TikTok prioritizes completion rate and shares. Instagram prioritizes saves and shares. Learn the specific signals for your primary platform.

## Hooks and Thumbnails

The first three seconds of your content and your thumbnail are the most important elements of any piece of content. If people do not click or keep watching past the opening, nothing else matters.

- **Your thumbnail is your billboard.** It needs to be visually striking, easy to read at small sizes, and create curiosity. Use bold text, expressive faces, and high contrast.
- **Open with a hook.** Start your video with a statement that makes people want to keep watching. Ask a question, make a bold claim, or tease what is coming.
- **Avoid generic openings.** Do not start with "Hey guys, welcome back to my channel." Jump straight into the value or the story.
- **Study what gets you to click.** Pay attention to the thumbnails and titles that make you click on YouTube or stop scrolling on TikTok. What made them effective? Apply those principles.
- **Test and iterate.** YouTube lets you change thumbnails after publishing. If a video is not getting clicks, try a different thumbnail.

## Engaging With Your Community

Your audience is not a number — they are real people. The creators who build the strongest communities are the ones who treat their followers like friends, not fans.

- **Reply to every comment early on.** When you are small, you have the advantage of being able to respond to everyone. This builds incredible loyalty.
- **Ask questions in your content.** Give viewers a reason to comment. End videos with a question related to your topic.
- **Go live regularly.** Live sessions create a deeper connection than any edited video. Even if only five people show up, those five will become your biggest supporters.
- **Use Stories and community posts.** Instagram Stories, YouTube Community posts, and Twitter/X posts let you connect with your audience between your main content.
- **Remember your regulars.** When the same person comments on every video, acknowledge them. These are your superfans, and they will be the first to support you when you launch products or land brand deals.

## Collaboration and Shoutouts

Growing together with other creators is one of the most effective and enjoyable ways to build your audience.

- **Collaborate with creators at your level.** You do not need to collaborate with someone who has a million subscribers. Find creators with a similar audience size and create content together.
- **Offer value in collaborations.** Do not just ask someone to promote you. Propose a collaboration that benefits both of you — a joint video, a challenge, or a cross-promotion.
- **Engage with other creators' content.** Leave thoughtful comments on videos in your niche. Build genuine relationships before asking for anything.
- **Bahamian creator community.** Connect with other Bahamian creators. Supporting each other strengthens the entire local creator ecosystem, and there is room for everyone to succeed.

## SEO and Discoverability

Search engine optimization is not just for websites. YouTube is the second largest search engine in the world, and every platform has search functionality that you can optimize for.

- **Research keywords.** Use YouTube's search suggestions, TikTok's search bar, and tools like vidIQ to find what people are searching for in your niche.
- **Optimize your titles.** Include relevant keywords naturally in your video titles. Be descriptive and specific — "How to Make Authentic Bahamian Conch Salad" performs better than "Cooking Video."
- **Write detailed descriptions.** YouTube descriptions should be at least two to three paragraphs long, naturally incorporating relevant keywords.
- **Use hashtags strategically.** On TikTok and Instagram, hashtags help categorize your content. Use a mix of broad and niche-specific hashtags.
- **Create searchable content.** How-to videos, tutorials, and answer-based content gets discovered through search long after you post it.

## Analyzing Your Analytics

Your analytics tell you what is working and what is not. Learning to read them is one of the most valuable skills you can develop as a creator.

- **Watch time and retention.** Look at where people drop off in your videos. If most viewers leave at the same point, something in your content is causing them to lose interest.
- **Click-through rate (CTR).** On YouTube, this tells you how effective your thumbnails and titles are. A CTR above five percent is solid. Above ten percent is excellent.
- **Traffic sources.** Understand where your viewers come from — search, browse, suggested videos, external sources. This tells you what is driving your growth.
- **Audience demographics.** Know who is watching your content. Their age, location, and viewing habits should inform the content you create.
- **Best performing content.** Identify your top five videos. What do they have in common? Create more content with those characteristics.

Growth takes time, but it is inevitable if you keep showing up with valuable content. Trust the process, stay patient, and remember that every creator you admire started exactly where you are right now.`,
  },
  {
    slug: "monetization",
    title: "Monetization 101",
    subtitle: "Turn your content into income",
    icon: "\u{1F4B0}",
    order: 4,
    published: true,
    content: `## Turning Content Into Income

The creator economy is not just a hobby — it is a legitimate career path that thousands of people around the world are building successful businesses from. As a Bahamian creator, you have the opportunity to earn in U.S. dollars from a global audience while living in one of the most beautiful places on Earth.

This guide covers every major way creators earn money, from platform ad revenue to building your own products. The key principle to remember: diversify your income streams. The most successful creators never rely on a single source of revenue.

## Ad Revenue — Getting Paid by Platforms

The most straightforward way to earn as a creator is through platform ad revenue. When ads play on your content, you earn a share of the advertising income.

- **YouTube Partner Program (YPP)** is the gold standard. Once you hit 1,000 subscribers and 4,000 watch hours (or 10 million Shorts views in 90 days), you can apply. YouTube pays creators through AdSense, and the revenue varies by niche.
- **RPM (Revenue Per Mille)** is the amount you earn per 1,000 views after YouTube takes its cut. Finance and business niches can earn fifteen to thirty dollars RPM, while entertainment might earn three to eight dollars RPM.
- **TikTok's Creator Rewards Program** pays for original content over one minute. The rates are lower than YouTube, but the potential for high view counts can compensate.
- **Instagram and Facebook** offer bonus programs and ad revenue sharing that change frequently. Keep an eye on new monetization features as they launch.
- **Your audience geography matters.** Advertisers pay more to reach viewers in the United States, Canada, United Kingdom, and Australia. Content that appeals to these markets generates higher RPM.

As a Bahamian creator, remember that U.S.-sourced ad revenue may be subject to withholding. Check our Earn page for details on tax considerations.

## Sponsorships and Brand Deals

For most creators, sponsorships and brand deals are the single largest source of income — often earning more than ad revenue, even for larger channels.

- **Brands pay creators to promote products.** This can be a dedicated video, a segment within a video, an Instagram post, a TikTok, or a Story.
- **You do not need a massive following.** Brands are increasingly working with micro-creators (1,000 to 50,000 followers) because they often have higher engagement rates and more trusted audiences.
- **Rates vary widely.** A general benchmark is twenty to fifty dollars per 1,000 followers for a single post, but rates depend on your niche, engagement rate, and the scope of work.
- **Only promote products you believe in.** Your audience's trust is your most valuable asset. Promoting products you do not actually like will erode that trust quickly.
- **Build a media kit.** A media kit is a document that showcases your audience demographics, engagement rates, content examples, and rates. It is your professional pitch to brands.

We cover brand deals in much more depth in our dedicated Landing Brand Deals guide.

## Affiliate Marketing

Affiliate marketing lets you earn a commission every time someone purchases a product through your unique referral link.

- **Amazon Associates** is the most popular affiliate program. You earn one to ten percent on products purchased through your links.
- **High-ticket affiliate programs** for software, courses, and services can pay fifty to several hundred dollars per referral.
- **It works best when integrated naturally.** Recommend products you genuinely use in your content, and include your affiliate links in descriptions or link-in-bio pages.
- **Recurring commissions** are the holy grail. Some software affiliate programs pay you monthly as long as the customer you referred stays subscribed.
- **Disclosure is required.** Always disclose when you use affiliate links. It is both legally required and builds trust with your audience.

## Digital Products

Creating and selling digital products is one of the highest-margin ways to earn as a creator. You create the product once and sell it unlimited times.

- **Online courses** are incredibly popular. If you have expertise in any area, you can package that knowledge into a course and sell it to your audience.
- **Ebooks and guides** are simpler to create than courses. Write a comprehensive guide on a topic your audience cares about.
- **Templates and presets** work well for creative niches. Editing presets for photographers, Canva templates for businesses, or Notion templates for productivity enthusiasts.
- **Printables and digital downloads** can include planners, worksheets, art prints, and more.
- **Platforms to sell on** include Gumroad, Stan Store, Teachable, and your own website. These platforms handle payments and delivery for you.

As a Bahamian creator, consider what unique knowledge you can package. A guide to Bahamian recipes, a travel planning template for visiting the islands, or a course on Caribbean content creation could all find enthusiastic buyers.

## Services

Your creator skills make you valuable beyond your own content. Many creators earn significant income by offering services to others.

- **Content creation for businesses.** Local Bahamian businesses need social media content. Your skills in filming, editing, and understanding platforms are highly valuable to them.
- **Coaching and consulting.** Once you have built a following, other aspiring creators will pay for your guidance. One-on-one coaching calls can command fifty to several hundred dollars per hour.
- **Freelance editing, design, and copywriting.** The skills you develop as a creator — video editing, graphic design, writing — are all marketable freelance skills.
- **Speaking engagements.** As your expertise grows, opportunities for paid speaking at events and workshops will emerge.

## Memberships and Subscriptions

Recurring revenue is the most sustainable form of income for creators. Memberships let your biggest fans support you on an ongoing basis.

- **Patreon** lets you offer exclusive content, behind-the-scenes access, and community perks to paying members.
- **YouTube Channel Memberships** let subscribers pay a monthly fee for badges, custom emojis, and exclusive content.
- **Paid communities** on platforms like Discord, Circle, or Skool let you build an exclusive space where members pay for access to you and each other.
- **Newsletter subscriptions** through platforms like Substack or Beehiiv let you monetize written content.
- **The key to memberships** is providing consistent value that justifies the ongoing cost. Exclusive content, direct access, and community are the most valued benefits.

## Diversifying Your Income Streams

The creators who build sustainable careers are the ones who do not rely on any single income source.

- **Start with one or two revenue streams.** Do not try to launch everything at once. Get ad revenue and one other income source working first.
- **Reinvest in your growth.** Use early earnings to improve your equipment, invest in education, or hire help with editing.
- **Build assets, not just income.** An email list, a digital product library, and a loyal community are assets that generate revenue for years.
- **Track everything.** Know exactly how much you earn from each source. This helps you focus your energy on the most profitable activities.
- **Think long term.** Platform algorithms change, ad rates fluctuate, and trends come and go. A diversified income protects you from any single change wiping out your revenue.

The creator economy offers genuine financial opportunity. Start with the monetization method that fits your current audience size and content style, and expand from there. The income will grow as your audience grows — trust the process and keep creating.`,
  },
  {
    slug: "brand-deals",
    title: "Landing Brand Deals",
    subtitle: "How to attract and negotiate sponsorships",
    icon: "\u{1F91D}",
    order: 5,
    published: true,
    content: `## The World of Brand Partnerships

Brand deals are often the most lucrative income stream for creators at every level. Companies want to reach audiences through trusted voices, and as a creator, you are that trusted voice. The good news is that you do not need millions of followers to start landing deals. Brands of all sizes are looking for creators of all sizes.

This guide covers everything from knowing when you are ready, to building your media kit, to negotiating like a professional.

## When You Are Ready for Brand Deals

Many creators think they need a huge following before brands will be interested. That is simply not true.

- **Micro-creators (1,000 to 10,000 followers)** are highly attractive to brands because they tend to have higher engagement rates and more personal relationships with their audience.
- **Engagement matters more than follower count.** A creator with 5,000 engaged followers is more valuable to brands than one with 50,000 followers who barely interact.
- **Niche relevance is key.** A brand selling fishing gear would rather partner with a Bahamian fishing creator who has 2,000 dedicated followers than a general lifestyle creator with 100,000.
- **You are ready when you can demonstrate value.** If you create quality content consistently and have an audience that engages, you are ready to start pursuing brand deals.

## Building Your Media Kit

A media kit is your professional resume as a creator. It is the document you send to brands to show them why they should work with you.

- **Keep it to one or two pages.** Brands review dozens of pitches. Make yours easy to scan.
- **Include your key metrics.** Follower count, average views, engagement rate, and audience demographics (age, gender, location).
- **Showcase your best work.** Include screenshots or links to three to five of your highest-performing pieces of content.
- **Highlight your audience.** Brands care about who is watching, not just how many. Share your audience insights — what percentage are in key demographics, what countries are they in, what are their interests.
- **Add testimonials if you have them.** If you have worked with brands before, include a quote about the results you delivered.
- **Make it visually appealing.** Use Canva to create a clean, branded media kit that reflects your style. First impressions matter.
- **Include your rates.** Some creators prefer to negotiate rates per deal, but including a rate card (or at least a starting range) shows brands you are professional and know your worth.

## Setting Your Rates

One of the most common questions from new creators is "how much should I charge?" Here are several frameworks to help you set fair rates.

- **CPM-based pricing.** Calculate your average views and charge a rate per 1,000 views. Industry standard ranges from twenty to fifty dollars CPM depending on niche and platform.
- **Flat rate pricing.** Charge a flat fee per deliverable. For example, one dedicated YouTube video might be your flat rate, while an Instagram Story might be a different rate.
- **Follower-based estimates.** A very rough starting point is one to two cents per follower per post. A creator with 10,000 followers might charge one hundred to two hundred dollars per post.
- **Factor in production costs.** Your rate should account for your time concepting, filming, editing, posting, and reporting on the content. Do not undercharge just because you are new.
- **Performance-based deals.** Some brands offer payment based on sales or clicks you generate. These can be lucrative but also carry risk. Consider a hybrid model with a base fee plus performance bonus.

## Finding Brands to Work With

Do not wait for brands to come to you. Proactive outreach dramatically accelerates your sponsorship revenue.

- **Start with brands you already use and love.** Your first pitches should be to products and services you genuinely use. Your enthusiasm will come through naturally.
- **Look local.** Bahamian businesses, Caribbean brands, and tourism-related companies are excellent targets. They value creators who understand the local market.
- **Use influencer platforms.** AspireIQ, Grin, CreatorIQ, and Collabstr connect creators with brands looking for partnerships. Create profiles on several of these.
- **Direct outreach via email and DMs.** Find the marketing contact at brands you want to work with. LinkedIn and company websites are good places to find the right person.
- **Engage with brands on social media.** Like, comment on, and share content from brands you want to work with. Get on their radar before you pitch.

## Pitching Brands

Your pitch is your first impression. A great pitch is concise, personalized, and clearly communicates the value you offer.

- **Personalize every pitch.** Never send a generic mass email. Reference the brand's recent campaigns, products, or values that align with your content.
- **Lead with value.** Do not start with what you want. Start with what you can do for the brand. "I have an idea for content that would showcase your product to ten thousand engaged viewers in the Caribbean market."
- **Keep it short.** Three to four paragraphs maximum. Brands receive many pitches, so respect their time.
- **Include your media kit.** Attach it or link to it so they can quickly review your metrics.
- **Propose a specific idea.** Instead of saying "I would love to work together," pitch a concrete content concept. "I would create a three-part TikTok series showing how I use your product in my daily routine."
- **Follow up.** If you do not hear back in five to seven business days, send a polite follow-up. Many deals happen on the second or third touchpoint.

## Negotiating Your Deals

Negotiation is a skill that directly impacts your income. Learn to negotiate confidently and professionally.

- **Know your worth.** Do your research on industry rates. Never accept a deal that undervalues your work just because you are excited about the opportunity.
- **Negotiate beyond money.** If a brand cannot meet your rate, negotiate for product, longer-term partnerships, exclusivity fees, or usage rights compensation.
- **Ask about usage rights.** If a brand wants to use your content in their ads, that should cost extra. Content licensing can be as valuable as the creation fee itself.
- **Do not be afraid to say no.** Walking away from a bad deal protects your brand and signals confidence. There will always be more opportunities.
- **Get everything in writing.** Verbal agreements mean nothing. Ensure every detail — deliverables, timeline, payment terms, usage rights — is documented in a contract.

## Contracts and Payment

Protecting yourself legally and financially is essential in brand partnerships.

- **Read every contract carefully.** Pay attention to deliverables, deadlines, revision limits, exclusivity clauses, usage rights, and payment terms.
- **Red flags to watch for.** Unlimited revisions, perpetual usage rights without extra compensation, exclusivity periods longer than thirty days, and payment terms beyond net-60.
- **Standard payment terms** are net-30 (payment within thirty days of content going live). Some brands push for net-60 or net-90. Negotiate for faster payment when possible.
- **Request partial upfront payment** for larger deals. A fifty percent deposit before work begins and fifty percent upon delivery is standard for deals above a certain amount.
- **Invoice promptly.** Send your invoice as soon as the deliverables are complete. Late invoicing leads to late payment.

## Delivering Results and Building Relationships

The goal is not just one brand deal — it is building long-term partnerships that provide consistent income.

- **Exceed expectations.** Deliver your content ahead of deadline, provide extra value like bonus Story frames, and communicate proactively throughout the process.
- **Share results.** After the content goes live, send the brand a recap with views, engagement, and any relevant metrics. This demonstrates professionalism and ROI.
- **Ask for feedback.** Show brands you care about improving and delivering better results each time.
- **Stay in touch.** Follow up quarterly with brands you have worked with, sharing updates on your growth and new ideas for collaboration.
- **Build a reputation.** In the creator industry, your reputation travels fast. Being reliable, professional, and easy to work with will lead to referrals and repeat business.

Brand deals are a skill that improves with practice. Your first deal might be small, but each partnership builds your experience, your portfolio, and your confidence. Start reaching out today — the brands are waiting for creators like you.`,
  },
  {
    slug: "tools",
    title: "Essential Creator Tools",
    subtitle: "Software, apps, and resources to level up your content",
    icon: "\u{1F6E0}\u{FE0F}",
    order: 6,
    published: true,
    content: `## Your Creator Toolkit

The right tools can dramatically improve the quality and efficiency of your content creation. The great news is that many of the best tools are completely free or have generous free tiers. You do not need to spend a fortune on software to create professional-looking content.

This guide covers the essential tools every Bahamian creator should know about, organized by category. Start with the free options and upgrade as your revenue grows.

## Video Editing

Video editing is where your raw footage becomes polished content. The tool you choose depends on your platform, your skill level, and your budget.

- **CapCut (Free)** is the best free video editor for most creators. It runs on your phone and desktop, has an intuitive interface, and includes advanced features like keyframing, color correction, and text animations. If you are just starting out, CapCut is all you need.
- **DaVinci Resolve (Free)** is a professional-grade desktop editor used in Hollywood. The free version includes virtually every feature you need. It has a steeper learning curve than CapCut, but the results are stunning. Perfect for YouTube creators who want cinema-quality editing.
- **Adobe Premiere Pro (Paid)** is the industry standard for professional video editing. It costs around twenty to thirty dollars per month and offers the most comprehensive feature set. Consider this once you are earning consistent revenue from your content.
- **Final Cut Pro (Paid, Mac only)** is a one-time purchase alternative to Premiere Pro for Mac users. Many top YouTubers use Final Cut for its speed and optimization on Apple hardware.
- **VN Video Editor (Free)** is another excellent mobile option with a clean interface and no watermarks.

### Tips for Editing

- **Learn keyboard shortcuts.** They will cut your editing time in half.
- **Keep a consistent style.** Use the same fonts, colors, and transitions across your content to build brand recognition.
- **Do not over-edit.** Sometimes simple cuts and clean audio are more effective than flashy effects.

## Graphic Design

Strong visuals — thumbnails, social media graphics, and branded assets — set professional creators apart.

- **Canva (Free tier)** is incredibly powerful and easy to use. Create thumbnails, social media posts, media kits, and presentations. The free tier includes thousands of templates, fonts, and elements. Canva Pro adds brand kits, background removal, and more templates.
- **Figma (Free tier)** is a professional design tool that runs in your browser. It is more complex than Canva but offers unlimited creative control. Great for creators who want to develop advanced design skills.
- **Adobe Photoshop (Paid)** remains the most powerful image editing tool. Worth the investment once you are creating thumbnails at a professional level.
- **Remove.bg (Free)** instantly removes backgrounds from images. Perfect for creating clean thumbnails with subject cutouts.
- **Photopea (Free)** is a browser-based Photoshop alternative that supports PSD files. No download required.

## Scheduling and Planning

Consistency requires planning. These tools help you organize your content calendar and schedule posts in advance.

- **Notion (Free tier)** is the ultimate planning tool for creators. Use it as a content calendar, idea database, script library, and project manager. Many creators consider Notion the single most important tool in their workflow.
- **Later (Free tier)** lets you visually plan and schedule Instagram posts, TikToks, and more. The visual calendar makes it easy to maintain a cohesive feed.
- **Buffer (Free tier)** is a simple, clean scheduling tool that supports all major platforms. Schedule posts, track performance, and manage multiple accounts.
- **Google Calendar** works well as a simple content calendar if you do not need advanced features. Block out filming days, editing days, and posting times.
- **Trello (Free tier)** uses a board-and-card system that many creators love for tracking content from idea to published.

## Analytics

Understanding your numbers is essential for making smart decisions about your content strategy.

- **Native platform analytics** should be your primary data source. YouTube Studio, TikTok Analytics, and Instagram Insights are free and provide the most accurate data about your performance.
- **Social Blade (Free)** tracks your growth and the growth of other creators over time. Useful for benchmarking your progress and researching potential collaborators.
- **vidIQ (Free tier)** is essential for YouTube creators. It shows keyword search volume, competition scores, and optimization suggestions. The free tier provides tremendous value.
- **TubeBuddy (Free tier)** is another YouTube optimization tool with features like A/B thumbnail testing, tag suggestions, and SEO analysis.
- **Not Just Analytics** provides detailed engagement analysis for Instagram accounts.

## AI Tools

Artificial intelligence is transforming content creation. These tools can save you hours of work every week.

- **ChatGPT** is invaluable for scripting, brainstorming video ideas, writing descriptions, crafting pitches to brands, and generating content outlines. It will not replace your creativity, but it supercharges your workflow.
- **AI thumbnail generators** like Ideogram and Midjourney can create eye-catching thumbnail backgrounds and elements. Combine them with Canva for professional results.
- **Caption generators** like Captions AI and CapCut's auto-captions add subtitles to your videos automatically. Captions increase watch time because many viewers watch without sound.
- **AI voice tools** can help with voiceovers, pronunciation, and script practice. Useful for creators who are not yet comfortable on camera.
- **Opus Clip** uses AI to identify the best moments in your long-form content and automatically creates short clips for TikTok and Reels.

## Music and Sound

Good audio elevates your content from amateur to professional. Here is where to find music and sound effects legally.

- **Epidemic Sound (Paid)** offers the largest library of royalty-free music and sound effects. Most full-time YouTubers use Epidemic Sound because it covers you legally across all platforms.
- **Artlist (Paid)** is another premium music licensing platform with a clean interface and high-quality tracks.
- **YouTube Audio Library (Free)** provides thousands of free tracks and sound effects you can use in your content without any copyright issues.
- **Pixabay Music (Free)** offers free music tracks that can be used in your content with no attribution required.
- **Uppbeat (Free tier)** curates royalty-free music specifically for creators, with a generous free tier.
- **Never use copyrighted music without permission.** A copyright strike can demonetize your content or get your account suspended. Always use properly licensed music.

## Link in Bio Tools

Your link in bio is where you send followers to take action — visit your other platforms, buy your products, or sign up for your newsletter.

- **Linktree (Free tier)** is the most popular link-in-bio tool. Create a simple landing page with links to everything you want your audience to access.
- **Stan Store (Paid)** goes beyond links — it lets you sell digital products, book coaching calls, and collect emails directly from your link in bio. Many creators are switching to Stan Store as their primary storefront.
- **Beacons (Free tier)** combines link in bio with a full creator storefront, email collection, and analytics.
- **Bio Sites by Squarespace (Free)** offers a clean, minimalist link-in-bio page that integrates with Squarespace if you have a website.

## Financial Tools

As your creator income grows, staying organized financially becomes essential.

- **Track every dollar.** Use a spreadsheet or accounting tool to record all income sources and business expenses from day one.
- **Wave (Free)** provides free invoicing and accounting software perfect for freelancers and creators.
- **QuickBooks Self-Employed (Paid)** is a more robust option for tracking income, expenses, and tax deductions.
- **PayPal and Wise** are essential for receiving international payments from brands and platforms. As a Bahamian creator earning from global sources, having reliable payment infrastructure is critical.
- **Separate your finances.** Open a dedicated bank account for your creator income. This makes tracking and tax reporting dramatically easier.

The tools you use should serve your creative goals, not complicate them. Start with free options, master them, and upgrade only when a paid tool will genuinely save you time or improve your results. The best content comes from your ideas and effort — tools just help you execute more efficiently.`,
  },
];

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results: { slug: string; status: string }[] = [];

    for (const guide of seedGuides) {
      const existing = await prisma.guide.findUnique({
        where: { slug: guide.slug },
      });

      if (existing) {
        results.push({ slug: guide.slug, status: "skipped (already exists)" });
        continue;
      }

      await prisma.guide.create({ data: guide });
      results.push({ slug: guide.slug, status: "created" });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed guides." },
      { status: 500 }
    );
  }
}
