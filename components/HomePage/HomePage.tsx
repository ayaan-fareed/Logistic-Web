'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import SmoothScroll from '@/components/SmoothScroll/SmoothScroll';
import LiveTracking from '@/components/LiveTracking/LiveTracking';
import IntroVisual from '@/components/IntroVisual/IntroVisual';
import styles from './HomePage.module.scss';

const GlobeCanvas = dynamic(() => import('@/components/3d/GlobeCanvas'), { ssr: false, loading: () => <div className={styles.globeLoader}>Loading network</div> });

const services = [
  ['01', 'Air freight', 'Time-definite capacity, customs expertise, and hands-on coordination across every airport.'],
  ['02', 'Ocean freight', 'Clear routing, reliable sailing schedules, and control from port to final mile.'],
  ['03', 'Road freight', 'Responsive domestic and cross-border road solutions that keep your supply chain moving.'],
  ['04', 'Project logistics', 'Detailed planning for the shipments that do not fit inside a standard playbook.'],
  ['05', 'Warehousing', 'Flexible inventory and fulfilment operations engineered around your growth.'],
  ['06', 'Customs', 'Practical compliance support that gets freight across borders without surprises.'],
];

const capabilities = [
  ['Visibility, without the chase.', 'One view of every shipment. Live milestones, proactive exceptions, and people who answer when you need them.'],
  ['Operational ownership.', 'We coordinate carriers, clearance, handling, and delivery as one accountable team—not a chain of handoffs.'],
  ['Built around your urgency.', 'A senior logistics partner combines local knowledge with a global operating rhythm tailored to your business.'],
];

export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo('[data-reveal]', { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.09, scrollTrigger: { trigger: '[data-reveal]', start: 'top 88%' } });
    });
    return () => { context.revert(); };
  }, []);

  return (
    <main className={styles.page}>
      <SmoothScroll />
      <Navbar />

      <section className={styles.hero} id="home">
        <div className={styles.heroCanvas}><GlobeCanvas /></div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Independent global logistics</p>
          <h1><span>We move freight.</span><span>We own the outcome.</span></h1>
          <p className={styles.heroCopy}>From first booking to final delivery, we make complex logistics feel refreshingly straightforward.</p>
          <div className={styles.heroActions}><Link href="/contact" className={styles.darkButton}>Start a conversation <b>→</b></Link><a href="#services" className={styles.textButton}>Explore our services <b>↓</b></a></div>
        </div>
        <div className={styles.heroFoot}><span>Scroll to explore</span><span>01 — 05</span></div>
      </section>

      <div className={styles.marquee} aria-label="Every leg of the journey"><div>Every leg of the journey <b>✦</b> Every leg of the journey <b>✦</b> Every leg of the journey <b>✦</b> Every leg of the journey <b>✦</b></div></div>

    <LiveTracking />

      <section className={styles.intro} id="intro">
        <div className={styles.introLeft}>
          <div className={styles.sectionIndex}>01 / What we do</div>
          <IntroVisual />
        </div>
        <div className={styles.introRight}>
          <p className={styles.largeCopy} data-reveal>Freight is only one part of the equation. We bring together the people, systems, and global network that make your supply chain work harder.</p>
          <a className={styles.inlineLink} href="#approach">How we work <span>→</span></a>
        </div>
      </section>

      <section className={styles.stats}><div data-reveal><strong>2,500<span>+</span></strong><p>shipments coordinated<br />each month</p></div><div data-reveal><strong>98.2<span>%</span></strong><p>on-time delivery<br />performance</p></div><div data-reveal><strong>42</strong><p>countries connected<br />through our network</p></div></section>

      <section className={styles.services} id="services"><div className={styles.servicesHead}><div><p className={styles.eyebrow}>02 / Capabilities</p><h2>Built to keep<br />business moving.</h2></div><p>Whatever the mode, origin, or deadline, our specialists make the right connections to get it there.</p></div><div className={styles.serviceGrid}>{services.map(([number, title, copy]) => <article className={styles.serviceCard} key={title} data-reveal><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><b>↗</b></article>)}</div></section>

      <section className={styles.approach} id="approach"><div className={styles.approachSticky}><p className={styles.eyebrow}>03 / The United difference</p><h2>Logistics that feels <em>personal.</em></h2><p>We believe the best service is less about promises and more about the confidence you feel at every point in the journey.</p></div><div className={styles.capabilityList}>{capabilities.map(([title, copy], index) => <article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><a href="#contact">Discover more <b>→</b></a></article>)}</div></section>

      <section className={styles.quote}><p className={styles.eyebrow}>A better way forward</p><blockquote data-reveal>“The details make the difference. That&apos;s why we stay close to every shipment, every customer, and every outcome.”</blockquote><p className={styles.quoteBy}>Sofia Grant — Managing Director</p></section>

      <section className={styles.insights} id="insights"><div className={styles.servicesHead}><div><p className={styles.eyebrow}>04 / Insight</p><h2>Made for<br />the real world.</h2></div><a className={styles.inlineLink} href="#contact">View all insights <span>→</span></a></div><div className={styles.insightGrid}><article data-reveal><div className={`${styles.articleImage} ${styles.imageOne}`} /><p>Market intelligence · 6 min read</p><h3>How supply chains are finding certainty in an uncertain market</h3><a href="#contact">Read article <b>→</b></a></article><article data-reveal><div className={`${styles.articleImage} ${styles.imageTwo}`} /><p>Operations · 4 min read</p><h3>Five questions to ask before you ship peak-season cargo</h3><a href="#contact">Read article <b>→</b></a></article></div></section>

      <section className={styles.contact} id="contact"><div className={styles.dotField} /><p className={styles.eyebrow}>Let&apos;s move something forward</p><h2>Ready when<br />you are.</h2><Link href="/contact" className={styles.lightButton}>Talk to our team <span>→</span></Link></section>

      <Footer />
    </main>
  );
}
