import './style.scss'
import ProfileMenu from 'components/molecules/ProfileMenu'
import ContentSwitcherButton from 'components/atoms/ContentSwitcherButton'
import { useState } from 'react'
import { EProfilePageContentType } from './models/profilePageContentType'
import OfferApplicationHistory from 'components/organisms/OfferApplicationHistory'

const ProfilePage = () => {
  const [visibleContent, setVisibleContent] = useState(EProfilePageContentType.OffersApplied)

  return (
    <div className="profile-page">
      <ProfileMenu />
      <section className="profile__info">
        <div className="profile__menu">
          <ContentSwitcherButton
            onClick={() => setVisibleContent(EProfilePageContentType.OffersApplied)}
            isActive={visibleContent === EProfilePageContentType.OffersApplied}>
            Applied
          </ContentSwitcherButton>
        </div>
        {visibleContent === EProfilePageContentType.OffersApplied ? (
          <OfferApplicationHistory />
        ) : (
          <></>
        )}
      </section>
    </div>
  )
}

export default ProfilePage
