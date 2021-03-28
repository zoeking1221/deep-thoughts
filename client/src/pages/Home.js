import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
// use to check logged-in status of user
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';

const Home = () => {

  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // user object destructuring to extract 'data' from the 'useQuery' hook's response
  // rename it 'userData' to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // if you're logged in, loggedIn variable will be true - if not, it will be false
  const loggedIn = Auth.loggedIn();

  // if data exists, store it in the thoughts constant
  // if data is undefined, then save an empty array to thoughts component
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  // if user isn't logged in, <div> will span the whole row.
  // but if user is logged in, it will only span 8 columns, leaving space for 4 column div for friends
  return (
    <main>
      <div className="flex-row justify-space-between">
          {loggedIn && (
            <div className="col-12 mb-3">
              <ThoughtForm />
            </div>
          )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
