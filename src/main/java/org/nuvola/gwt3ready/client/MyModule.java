package org.nuvola.gwt3ready.client;

import org.nuvola.gwt3ready.client.application.ApplicationModule;

import com.google.gwt.inject.client.AbstractGinModule;
import com.gwtplatform.mvp.client.annotations.DefaultPlace;
import com.gwtplatform.mvp.client.annotations.ErrorPlace;
import com.gwtplatform.mvp.client.annotations.UnauthorizedPlace;
import com.gwtplatform.mvp.client.gin.DefaultModule;
import com.gwtplatform.mvp.client.proxy.DefaultPlaceManager;
import com.gwtplatform.mvp.shared.proxy.RouteTokenFormatter;

public class MyModule extends AbstractGinModule {
    @Override
    protected void configure() {
        DefaultModule defaultModule = new DefaultModule.Builder()
                .placeManager(DefaultPlaceManager.class)
                .tokenFormatter(RouteTokenFormatter.class)
                .build();

        bindConstant().annotatedWith(DefaultPlace.class).to(NameTokens.getHome());
        bindConstant().annotatedWith(ErrorPlace.class).to(NameTokens.getHome());
        bindConstant().annotatedWith(UnauthorizedPlace.class).to(NameTokens.getHome());

        install(defaultModule);
        install(new ApplicationModule());
    }
}
