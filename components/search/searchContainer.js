import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

import { REPO } from '../../common/constant';
import { createURL } from '../../utils/net';
import { colors } from '../theme/common_var';
import './_searchInput.scss';

import SearchResult from './searchResult';
import SearchAlertModal from './searchAlertModal';

const _ = {
  throttle,
  debounce,
  isEmpty
};

const H2 = styled.h2`
  color: ${colors.gray.gray80};
`;

const SearchBox = styled.div``;
const IconButtonWrapper = styled.div``;

class SearchContainer extends Component {
  state = {
    ...this.state,
    searchPattern: '',
    page: 1,
    height: 0,
    isButtonDisabled: true,
    rateLimitReset: undefined,
  }

  update = (obj) => {
    this.setState(obj);
  }

  handleChange = e => {
    this.setState({ searchPattern: e.target.value, isButtonDisabled: !e.target.value.replace(/\s/g, '').length });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchPattern.length === 0) {
      this.setState({ items: [], page: 1 });
      return;
    }

    this.setState({ isButtonDisabled: true });

    const requestUrl = createURL(REPO, {
      q: this.state.searchPattern,
      sort: 'updated',
      per_page: 100,
      page: 1
    });

    axios.get(requestUrl)
      .then(response => {
        this.setState(response.data);
        if (response.headers['x-ratelimit-remaining'] === 0) {
          this.setState({
            rateLimitReset: response.headers['x-ratelimit-reset'],
          })
        }

        setTimeout(() => {
          this.setState({ isButtonDisabled: false })
        }, 6000);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleScroll = () => {
    if(!this.state.items) return;

    if(this.state.total_count === this.state.items.length) return;

    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    const distanceFromBottom = 500;

    if (windowBottom >= (docHeight - distanceFromBottom)) { /**Prefetch */
      this.setState({ page: this.state.page + 1 }, () => {
        const requestUrl = createURL(REPO, {
          q: this.state.searchPattern,
          sort: 'updated',
          per_page: 100,
          page: this.state.page
        });
        axios.get(requestUrl)
          .then(response => {
            this.setState({ items: [...this.state.items, ...response.data.items] });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", _.throttle((this.handleScroll), 6000));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <Flex full center column>
        <SearchAlertModal rateLimitReset={this.state.rateLimitReset} update={this.update} />
        <H2>Search repositories in Github</H2>
        <form onSubmit={this.handleSubmit} className="search-form">
          <SearchBox className="search-box">
            <TextField
              id="Search"
              label="Search"
              value={this.state.searchPattern}
              onChange={this.handleChange}
              margin="normal" />
            <IconButtonWrapper>
              <IconButton disabled={this.state.isButtonDisabled} type="submit" aria-label="Search"><SearchIcon /></IconButton>
            </IconButtonWrapper>
          </SearchBox>
        </form>
        <SearchResult parentState={this.state} />
      </Flex>
    )
  }
}

export default SearchContainer
