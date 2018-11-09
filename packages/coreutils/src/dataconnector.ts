// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { IDataConnector } from './interfaces';

/**
 * An abstract class that adheres to the data connector interface.
 *
 * #### Notes
 * The only abstract method in this class is the `fetch` method, which must be
 * reimplemented by all subclasses. The `remove` and `save` methods have a
 * default implementation that returns a promise that will always reject. This
 * class is a convenience superclass for connectors that only need to `fetch`.
 *
 * The generic type arguments <T, U = T, V = string> semantics are:
 *
 * T - is the basic entity response type a particular service's connector.
 *
 * U = T - is the basic entity request type, which is conventionally the same as
 * the response type but may be different if a service's implementation requires
 * input data to be different from output responses.
 *
 * V = string - is the basic token applied to a request, conventionally a string
 * ID or filter, but may be set to a different type when an implementation
 * requires it.
 */
export abstract class DataConnector<T, U = T, V = string>
  implements IDataConnector<T, U, V> {
  /**
   * Retrieve an item from the data connector.
   *
   * @param id - The identifier used to retrieve an item.
   *
   * @returns A promise that bears a data payload if available.
   *
   * #### Notes
   * The promise returned by this method may be rejected if an error occurs in
   * retrieving the data. Nonexistence of an `id` will succeed with `undefined`.
   */
  abstract fetch(id: V): Promise<T | undefined>;

  /**
   * Retrieve the list of items available from the data connector.
   *
   * @param filter - The optional filter to apply to the connector request.
   *
   * @returns A promise that bears a list of data results. List may be empty.
   *
   * #### Notes
   * The promise returned by this method may be rejected if an error occurs in
   * retrieving the data. Nonexistence of data will succeed with an empty list.
   */
  list(filter?: V): Promise<T[]> {
    return Promise.reject(new Error('list method has not been implemented.'));
  }

  /**
   * Remove a value using the data connector.
   *
   * @param id - The identifier for the data being removed.
   *
   * @returns A promise that is rejected if remove fails and succeeds otherwise.
   *
   * #### Notes
   * This method will always reject; subclasses should reimplement it if they
   * support a back-end that can remove resources.
   */
  remove(id: V): Promise<void> {
    return Promise.reject(new Error('remove method has not been implemented.'));
  }

  /**
   * Save a value using the data connector.
   *
   * @param id - The identifier for the data being saved.
   *
   * @param value - The data being saved.
   *
   * @returns A promise that is rejected if saving fails and succeeds otherwise.
   *
   * #### Notes
   * This method will always reject; subclasses should reimplement it if they
   * support a back-end that can save resources.
   */
  save(id: V, value: U): Promise<void> {
    return Promise.reject(new Error('save method has not been implemented.'));
  }
}
