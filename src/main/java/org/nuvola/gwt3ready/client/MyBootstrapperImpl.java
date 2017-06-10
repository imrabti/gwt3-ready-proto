package org.nuvola.gwt3ready.client;

import javax.inject.Inject;

import com.gwtplatform.mvp.client.Bootstrapper;
import com.gwtplatform.mvp.client.proxy.PlaceManager;

public class MyBootstrapperImpl implements Bootstrapper {
    private final PlaceManager placeManager;

    @Inject
    MyBootstrapperImpl(PlaceManager placeManager) {
        this.placeManager = placeManager;
    }

    @Override
    public void onBootstrap() {
        placeManager.revealCurrentPlace();
    }
}
