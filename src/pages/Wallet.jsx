import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import Footer from '../components/Footer';


import '../styles/wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <Table />
        <Footer />
      </>
    );
  }
}

export default connect()(Wallet);
