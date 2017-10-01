import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Idea } from './components/entry/Idea'

export const routes = <Layout>
    <Route exact path='/' component={ Dashboard } />
    <Route path='/add' component={ Idea } />
</Layout>;
