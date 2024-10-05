import React from 'react';
import { Layout, Row, Col } from 'antd';
import './VideoBackgroundSection.css'; // CSS dosyası için import

const { Content } = Layout;

const VideoBackgroundSection = () => {
  return (
    <Layout>
      <Content>
        <div className="video-background">
          <video autoPlay loop muted className="background-video">
            <source src="path/to/your/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="content-overlay">
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
              <Col>
                <h1 className="overlay-title">Arka Planda Video Oynatımı</h1>
                <p className="overlay-text">Ant Design ile yapılmış bir örnek.</p>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default VideoBackgroundSection;
