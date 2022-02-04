import React from 'react'

export const modalContent = {
  admin: {
    incomplete: {
      title: 'Account Information Required',
      content: (
        <p>
          Before you can subscribe to the Developer Edition of AgencyCloud, we will first need to verify your account
          information. Please
          <a
            href="mailto:dmann@reapit.com?subject=Developer%20Edition%20of%20AgencyCloud%20Subscription"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            click here
          </a>{' '}
          to contact a member of the team.
        </p>
      ),
    },
  },
  user: {
    incomplete: {
      title: 'Account Information Required',
      content: (
        <p>
          Before you can subscribe to the Developer Edition of Agency Cloud, billing information will need to be
          submitted. Please ask the Admin of your organisation to visit this page to contact a member of the team.
        </p>
      ),
    },
  },
}
