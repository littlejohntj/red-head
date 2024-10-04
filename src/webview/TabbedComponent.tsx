import React, { useState } from 'react';

// Define the content for each tab
const TabContent = ({ tab }: { tab: string }) => {
    switch (tab) {
        case 'Wallet':
            return <div>Wallet content goes here</div>;
        case 'Transactions':
            return <div>Transaction history goes here</div>;
        case 'Settings':
            return <div>Settings options go here</div>;
        default:
            return null;
    }
};

const TabbedComponent: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Wallet');
    const tabs = ['Wallet', 'Transactions', 'Settings'];

    return (
        <div style={styles.container}>
            <div style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        style={{
                            ...styles.tab,
                            ...(activeTab === tab ? styles.activeTab : {})
                        }}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div style={styles.contentContainer}>
                <TabContent tab={activeTab} />
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
    },
    tabContainer: {
        display: 'flex',
        borderBottom: '1px solid #ccc',
    },
    tab: {
        padding: '10px 20px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        outline: 'none',
    },
    activeTab: {
        borderBottom: '2px solid #007bff',
        fontWeight: 'bold' as 'bold',
    },
    contentContainer: {
        padding: '20px',
    },
};

export default TabbedComponent;