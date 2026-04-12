import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedServices from '../components/FeaturedServices';
import NyayaBotPromo from '../components/NyayaBotPromo';
import TrackYourCaseWidget from '../components/TrackYourCaseWidget';
import FAQSection from '../components/FAQSection';

function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturedServices />
      <NyayaBotPromo />
      <TrackYourCaseWidget />
      <FAQSection />
    </>
  );
}

export default LandingPage;
