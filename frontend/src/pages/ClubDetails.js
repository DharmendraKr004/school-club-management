import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { clubsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import '../styles/modern.css';

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joining, setJoining] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchClub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchClub = async () => {
    try {
      setError('');
      const response = await clubsAPI.getClub(id);
      setClub(response.data.club);
    } catch (error) {
      console.error('Error fetching club:', error);
      setError(error.response?.data?.message || 'Failed to load club details');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClub = async () => {
    if (!isAuthenticated) {
      alert('Please login to join clubs');
      return;
    }

    setJoining(true);
    try {
      await clubsAPI.joinClub(id);
      fetchClub(); // Refresh club data
      alert('Successfully joined the club!');
    } catch (error) {
      alert('Error joining club: ' + error.response?.data?.message);
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return <Loading message="Loading club details..." />;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
        <h3>Error Loading Club</h3>
        <p>{error}</p>
        <button onClick={fetchClub} style={{ padding: '8px 16px', marginTop: '10px' }}>
          Try Again
        </button>
      </div>
    );
  }

  if (!club) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Club not found</div>;
  }

  const isMember = club.members?.some(member => member.user?._id === user?._id) || false;
  const isLeader = club.leader?._id === user?._id;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{club.name}</h1>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ backgroundColor: '#007bff', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>
          {club.category}
        </span>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <p>{club.description}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
        <div>
          <h3>Club Information</h3>
          <p><strong>Leader:</strong> {club.leader?.name || 'N/A'}</p>
          <p><strong>Members:</strong> {club.memberCount || 0}</p>
          <p><strong>Established:</strong> {new Date(club.establishedDate).toLocaleDateString()}</p>
          {club.meetingTime?.day && (
            <p><strong>Meetings:</strong> {club.meetingTime.day}s{club.meetingTime.time ? ` at ${club.meetingTime.time}` : ''}</p>
          )}
          {club.meetingTime?.location && (
            <p><strong>Location:</strong> {club.meetingTime.location}</p>
          )}
        </div>
        
        <div>
          <h3>Contact Information</h3>
          {club.contactInfo?.email && (
            <p><strong>Email:</strong> {club.contactInfo.email}</p>
          )}
          {club.contactInfo?.phone && (
            <p><strong>Phone:</strong> {club.contactInfo.phone}</p>
          )}
          {!club.contactInfo?.email && !club.contactInfo?.phone && (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No contact information available</p>
          )}
        </div>
      </div>

      {club.requirements && (
        <div style={{ marginBottom: '30px' }}>
          <h3>Requirements</h3>
          <p>{club.requirements}</p>
        </div>
      )}

      {isAuthenticated && !isLeader && (
        <div style={{ marginBottom: '30px' }}>
          {isMember ? (
            <p style={{ color: 'green' }}>✓ You are a member of this club</p>
          ) : (
            <button 
              onClick={handleJoinClub} 
              disabled={joining}
              style={{ 
                padding: '12px 24px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              {joining ? 'Joining...' : 'Join Club'}
            </button>
          )}
        </div>
      )}

      {club.announcements && club.announcements.length > 0 && (
        <div>
          <h3>Recent Announcements</h3>
          {club.announcements.slice(0, 5).map(announcement => (
            <div key={announcement._id} style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '15px', marginBottom: '15px' }}>
              <h4>{announcement.title} {announcement.isImportant && <span style={{ color: 'red' }}>!</span>}</h4>
              <p>{announcement.content}</p>
              <small style={{ color: '#666' }}>
                By {announcement.postedBy?.name || 'Unknown'} on {new Date(announcement.postedAt || announcement.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClubDetails;