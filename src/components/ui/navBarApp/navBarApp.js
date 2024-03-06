import React from 'react';
import { Input } from 'antd';
import { UserOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';

const NavBarApp = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '600px', padding: '0 10px', background: '#fff', borderRadius: '20px' }}>

                {/* Input to the left */}
                <Input
                    placeholder="Buscar"
                    prefix={<SearchOutlined />}
                    style={{ boxShadow: 'none' }} // Adjust the style as needed
                />

                {/* Icons to the right */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BellOutlined style={{ fontSize: '24px', color: '#000' }} />

                    <img
                        src="/path-to-your-profile-image.jpg" // Replace with the actual path to the profile image
                        alt="Profile"
                        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NavBarApp;
